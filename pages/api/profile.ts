import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['user-id'];

  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ message: 'User ID tidak valid' });
  }

  if (req.method === 'GET') {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: parseInt(userId) },
      });

      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ message: 'Karyawan tidak ditemukan' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data karyawan' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { fullName, email, department, whatsapp, photo } = req.body;

      const updatedEmployee = await prisma.employee.update({
        where: { id: parseInt(userId) },
        data: {
          fullName,
          email,
          department,
          whatsapp,
          photo,
        },
      });

      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui profil' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}