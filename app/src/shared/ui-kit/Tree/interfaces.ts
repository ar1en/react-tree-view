export interface TreeNode {
    id: string;
    name: string;
    type: string;
    children?: TreeNode[];
    isExpanded?: boolean;
}

export interface TreeProps {
    type: string
    getInitialData: (type:string) => Promise<TreeNode[]>;
    getChildren: (id: string, type: string) => Promise<TreeNode[]>
}

export interface LiProps {
    item: TreeNode
}

export interface ToggleProps {
    isExpanded: boolean;
    onClick: () => void;
    level: number;
    name: string;
    type: string;
}