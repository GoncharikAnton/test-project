import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDtos {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 3,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: (validationArguments) => {
        const constraints = validationArguments.constraints[0] as any;
        console.log(validationArguments);
        let resp =
          'Password is not strong enough, please fulfill the requirements: ' +
          `minLength : ${constraints.minLength}; ` +
          `minLowercase: ${constraints.minLowercase}; ` +
          `minUppercase: ${constraints.minUppercase}; ` +
          `minNumbers: ${constraints.minNumbers}; ` +
          `minSymbols: ${constraints.minSymbols}; `;
        return resp;
      },
    },
  )
  password: string;
}
