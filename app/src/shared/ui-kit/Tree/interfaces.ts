export interface TreeNode {
    id: string;
    name: string;
    type: string;
    uniqueID: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    isLoading?: boolean;
}

export interface TreeProps {
    data: TreeNode[]
}

export interface LiProps {
    item: TreeNode
}