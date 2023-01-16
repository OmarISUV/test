import { client as PrismaClient } from "../config/prisma.mjs";
/**
 * Middleware to validate is Master
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const middleware = async (request, response, next) => {
    const username = request.tokenInfo.key
    const user = await PrismaClient.user.findUnique({
        where: {username},
        include: {
            rol: true
        }
    }); 
    if(!user) return response.send("User not found")
    if(user.rol.key !== "master") return response.send("Not Master")
    return next();
  };
  
  export { middleware };
  