import { EmbedBuilder, Role, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { getAllRoles, createRole, deleteRole } from '../db/repos/rolesRepo';

export const listRoles: Command = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('List all roles in the server'),
  run: async (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('Roles')
      .setDescription('Choose a role')
      .setColor('#FFFF00')

    try {
      const allRoles = await getAllRoles()

      if (!allRoles.length) {
        interaction.reply('No roles found')
        return
      }
      else {
        const roleNames = allRoles.map(role => role.name)
        embed.addFields(roleNames.map(roleName => ({ name: `!\`\`\`${roleName}\`\`\``, value: '\n' })))

        interaction.reply({ embeds: [embed] })
      }
    } catch (error) {
      console.log(error)
      interaction.reply('Something went wrong')
    }
  }
}

export const addRole: Command = {
  data: new SlashCommandBuilder()
    .setName('add-role')
    .setDescription('Add a role')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to add')
        .setRequired(true))
    .setDefaultMemberPermissions(0),
  run: async (interaction) => {
    try {
      const role = interaction.options.get('role', true).role as Role
      await createRole(role)
      interaction.reply(`Role ${role.name} added`)
    } catch (error) {
      console.log(error)
      interaction.reply('Something went wrong')
    }
  }
}

export const removeRole: Command = {
  data: new SlashCommandBuilder()
    .setName('remove-role')
    .setDescription('Remove a role')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to remove')
        .setRequired(true))
    .setDefaultMemberPermissions(0),
  run: async (interaction) => {
    try {
      const roleName = interaction.options.get('role', true).role?.name
      if (roleName) await deleteRole(roleName)
      interaction.reply(`Role ${roleName} removed`)
    } catch (error) {
      console.log(error)
      interaction.reply('Something went wrong')
    }
  }
}

export const rolesCommand: Command[] = [listRoles, addRole, removeRole]