import { PartialType } from '@nestjs/swagger';
import { CreateAndersonDto } from './create-anderson.dto';

export class UpdateAndersonDto extends PartialType(CreateAndersonDto) { }
