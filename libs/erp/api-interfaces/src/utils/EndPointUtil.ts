export class EndPointUtil {
  static generateCRUD(module_name: string): {
    Find: string;
    FindOne: string;
    FindPermissionOfUserByEmail: string;
    Create: string;
    Update: string;
    Delete: string;
    UploadFile: string;
  } {
    return {
      Find: `${module_name}`,
      Create: `${module_name}`,
      FindOne: `${module_name}/id`,
      FindPermissionOfUserByEmail:`${module_name}/email`,
      Update: `${module_name}/id`,
      Delete: `${module_name}/id`,
      UploadFile: `${module_name}/upload`,
    }
  }
}