import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAndersonDto } from './dto/create-anderson.dto';
import { UpdateAndersonDto } from './dto/update-anderson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { OrderService } from 'src/order/order.service';
import { lastValueFrom } from 'rxjs';
import { OrderItemService } from 'src/order_item/order_item.service';
import { AndersonOrders, Enum_AndersonOrder } from '@prisma/client';

@Injectable()
export class AndersonService {
  constructor(private readonly httpService: HttpService, private readonly prisma: PrismaService, private readonly orderService: OrderService, private readonly orderItemService: OrderItemService) { }

  async send(orderId: string) {
    try {
      if (!process.env.ANDERSON_URL || !process.env.ANDERSON_TOKEN) {
        throw new InternalServerErrorException("Anderson URL or Token not configured");
      }
      const order = await this.orderService.findOne(orderId, true);
      if (!order) throw new InternalServerErrorException("Cannot Find Order");
      if (!order.customer) throw new InternalServerErrorException("Cannot Find Customer");
      console.log("🚀 ~ AndersonService ~ send ~ order:", order);
      if (!order.andersonOrders) throw new InternalServerErrorException("Cannot Find Status");
      if (order.andersonOrders && order.andersonOrders.status === "Success") throw new InternalServerErrorException("Order Already Confirmed");
      const url = `${process.env.ANDERSON_URL}api/v1/create/order`; // replace with the actual URL
      let products = '';
      for (let i = 0; i < order.items.length; i++) {
        let item = order.items[i];
        let orderItem = await this.orderItemService.findOne(item.id, true);
        if (!orderItem.product) throw new InternalServerErrorException("Cannot Find Product of Item : " + item.createdAt);
        products += orderItem.product.name.substring(0, 10) + ' '
        products += orderItem.quantity + " " + orderItem.size + ' '
        if (i + 1 < order.items.length) products += '+ '
      }
      console.log("🚀 ~ AndersonService ~ send ~ products:", products);
      let wilaya_code = await this.getWilayaCode((order.customer.address as any).province ?? '');
      // Prepare query parameters
      const params = {
        nom_client: order.customer.name,
        telephone: order.customer.phone,
        adresse: (order.customer.address as any).municipality ?? '',
        commune: (order.customer.address as any).municipality ?? '',
        code_wilaya: wilaya_code ?? '',
        montant: order.total + order.delivery_cost,
        remarque: order.observation,
        produit: products,
        stop_desk: (order.is_to_office) ? 1 : 0,
        type: 1
      };
      console.log("🚀 ~ AndersonService ~ send ~ params:", params);
      const headers = {
        Authorization: `Bearer ${process.env.ANDERSON_TOKEN}`,
      };
      // Make the POST request with query parameters
      const response$ = this.httpService.post(url, null, { headers, params });
      const response = await lastValueFrom(response$);
      await this.changeStatus(orderId, "Success");
      return true;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  changeStatus(orderId: string, status: Enum_AndersonOrder): Promise<AndersonOrders> {
    return this.prisma.andersonOrders.update({
      where: { orderId },
      data: { status }
    });
  }

  async getWilayaCode(name: string): Promise<string> {
    try {
      if (!process.env.ANDERSON_URL || !process.env.ANDERSON_TOKEN) {
        throw new Error('Anderson URL or Token not configured');
      }
      const url = `${process.env.ANDERSON_URL}api/v1/get/wilayas`; // Replace with the actual URL
      // Configure headers with the Bearer token
      const headers = {
        Authorization: `Bearer ${process.env.ANDERSON_TOKEN}`,
      };
      // Send the GET request with headers
      const response$ = this.httpService.get(url, { headers });
      const response = await lastValueFrom(response$);
      // Assuming `response.data` contains the list of wilayas
      const wilayas = response.data;
      // Find the wilaya code by name
      const wilaya = wilayas.find((item: any) => item.wilaya_name === name);
      if (!wilaya) {
        throw new Error(`Wilaya with name "${name}" not found`);
      }
      return wilaya.wilaya_id; // Adjust based on the actual structure of the API response
    } catch (error: any) {
      throw new Error(`Failed to get wilaya code: ${error.message}`);
    }
  }

  async getWilayas() {
    try {
      if (!process.env.ANDERSON_URL || !process.env.ANDERSON_TOKEN) {
        throw new Error('Anderson URL or Token not configured');
      }

      const url = `${process.env.ANDERSON_URL}api/v1/get/wilayas`; // Replace with the actual URL
      // Configure headers with the Bearer token
      const headers = {
        Authorization: `Bearer ${process.env.ANDERSON_TOKEN}`,
      };
      // Send the GET request with headers
      const response$ = this.httpService.get(url, { headers });
      const response = await lastValueFrom(response$);
      // Assuming `response.data` contains the list of wilayas
      const wilayas = response.data;
      console.log("🚀 ~ AndersonService ~ getWilayas ~ wilayas:", wilayas);
      // Find the wilaya code by name
      return wilayas.map((item: any) => item.wilaya_name);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // async getCommuns() {
  //   try {
  //     if (!process.env.ANDERSON_URL || !process.env.ANDERSON_TOKEN) {
  //       throw new Error('Anderson URL or Token not configured');
  //     }
  //     const url = `${process.env.ANDERSON_URL}api/v1/get/wilayas`; // Replace with the actual URL
  //     // Configure headers with the Bearer token
  //     const headers = {
  //       Authorization: `Bearer ${process.env.ANDERSON_TOKEN}`,
  //     };
  //     // Send the GET request with headers
  //     const response$ = this.httpService.get(url, { headers });
  //     const response = await lastValueFrom(response$);
  //     // Assuming `response.data` contains the list of wilayas
  //     const wilayas = response.data;

  //     const url2 = `${process.env.ANDERSON_URL}api/v1/get/communes`; // Replace with the actual URL
  //     // Send the GET request with headers
  //     const response2$ = this.httpService.get(url2, { headers });
  //     const response2 = await lastValueFrom(response$);
  //     // Assuming `response.data` contains the list of wilayas
  //     const communes = response.data;
  //     // Find the wilaya code by name
  //     return communes;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }

}
