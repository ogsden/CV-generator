export interface IProject {
  id?: number;
  name: string;
  internalName: string;
  from: string;
  to: string;
  description: string;
  domain: string;
  skills: Array<{ id: number; attributes: { name: string } }>;
  responsibilities: Array<{ id: number; attributes: { name: string } }>;
}
