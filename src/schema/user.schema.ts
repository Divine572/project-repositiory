import {
  DocumentType,
  getModelForClass,
  pre,
  prop,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt';
import { ObjectType, InputType, Field } from 'type-graphql';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(this.password, candidatePassword);
    } catch (e) {
      return false;
    }
  }
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
  schemaOptions: { timestamps: true },
  options: {
    allowMixed: Severity.ALLOW,
  },
});

@InputType()
export class CreateUserInput {}

@InputType()
export class GetUserInput {}
