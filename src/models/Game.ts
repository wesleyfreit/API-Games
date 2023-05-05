import { DataTypes } from "sequelize";
import connection from "../../database/database";

const Game = connection.define('games',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }
);

Game.sync();

export default Game;