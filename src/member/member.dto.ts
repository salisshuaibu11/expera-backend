import { IsString } from "class-validator";

class CreateMemberDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public address: string;

  @IsString()
  public department: string;
}

export default CreateMemberDto;
