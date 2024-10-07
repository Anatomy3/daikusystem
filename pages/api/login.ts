import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma'; // Mengimpor instance Prisma dari lib/prisma.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Login request received:', req.method);

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      console.log('Login attempt for username:', username);

      // Cari user berdasarkan username
      const user = await prisma.employee.findUnique({
        where: { username },
      });

      if (!user) {
        console.log('User not found:', username);
        return res.status(401).json({ message: 'User not found' });
      }

      // Bandingkan hash password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        console.log('Login successful for:', username);
        // Kembalikan userId dan role saat login berhasil
        return res.status(200).json({ userId: user.id, role: user.department, message: 'Login successful' });
      } else {
        console.log('Invalid password for:', username);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
