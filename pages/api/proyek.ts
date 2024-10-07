// Handler API
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const proyekList = await prisma.proyek.findMany();
      res.status(200).json(proyekList);
    } catch (error) {
      console.error('Error fetching proyek:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil proyek.' });
    }
  } else if (req.method === 'POST') {
    const { item, pic, input, output, status } = req.body; // Tambahkan status
    try {
      const newProyek = await prisma.proyek.create({
        data: { item, pic, input, output, status }, // Simpan status juga
      });
      res.status(201).json(newProyek);
    } catch (error) {
      console.error('Error creating proyek:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat membuat proyek.' });
    }
  } else if (req.method === 'PUT') {
    const { id, item, pic, input, output, status } = req.body; // Tambahkan status
    try {
      const updatedProyek = await prisma.proyek.update({
        where: { id: Number(id) },
        data: { item, pic, input, output, status }, // Update status juga
      });
      res.status(200).json(updatedProyek);
    } catch (error) {
      console.error('Error updating proyek:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate proyek.' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.proyek.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Proyek berhasil dihapus.' });
    } catch (error) {
      console.error('Error deleting proyek:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus proyek.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
