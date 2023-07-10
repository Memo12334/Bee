import { Command } from '../interfaces/Command';
import { ping } from './ping';
import { rolesCommand } from './roles';

export const CommandList: Command[] = [ping, ...rolesCommand]