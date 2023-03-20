// import { Request, Response } from 'express';
// // import { User, UserOptionalDefaults, UserPartial } from '../schemas';
// // import {
// //   createUser,
// //   findUserById,
// //   findUserByUsername,
// // } from '../services/user.service';

// export const register = async (
//   req: Request<{}, {}, UserOptionalDefaults>,
//   res: Response,
// ) => {
//   try {
//     const { username } = req.body;
//     const findUser = await findUserByUsername({ username });
//     if (findUser) {
//       return res.status(400).json({ message: 'username already taken' });
//     }
//     const user = await createUser(req.body);
//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

// eslint-disable-next-line max-len
// export const signin = async (req: Request, res: Response) => res.status(200).json({ message: 'Login successful' });

// export const logout = async (req: Request, res: Response) => {
//   req.logOut((error) => {
//     if (error) {
//       return res.status(400).json(error);
//     }
//     return res.status(200).json({ message: 'Logout successful' });
//   });
// };

export default {};
