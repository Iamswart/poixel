import { Model, ModelStatic } from "sequelize";
import bcrypt from "bcrypt";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    public id!: string;
    public email!: string;
    public name!: string;
    public password!: string;
    public businessType?: string;
    public isAdmin!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
    public lastLoginAt?: Date;
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLongEnough(value: string) {
            if (!value) return;
            if (value.length < 8) {
              throw new Error("Please choose a longer password");
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.setDataValue("password", hash);
          },
        },
      },
      businessType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  return User;
};
