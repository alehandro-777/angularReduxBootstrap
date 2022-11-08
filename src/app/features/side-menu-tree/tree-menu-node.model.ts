export interface TreeMenuNode {
    name: string;
    icon?: string;
    childNodes: TreeMenuNode[];
    payload?: {};
    expanded: boolean;
    selected?: boolean; 
  }