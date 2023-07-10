import { Role } from 'discord.js'
import prisma from '../prisma'

export const getAllRoles = async () => {
  const allRoles = await prisma.role.findMany()
  return allRoles
}

export const createRole = async (role: Role) => {
  await prisma.role.create({
    data: {
      name: role.name,
    }
  })
}

export const deleteRole = async (name: string) => {
  await prisma.role.delete({
    where: {
      name: name
    }
  })
}

export const getRoleByName = async (name: string) => {
  const role = await prisma.role.findUnique({
    where: {
      name: name
    }
  })
  return role
}