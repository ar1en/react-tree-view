import React, { useState, useEffect } from 'react';
import { TreeNode, TreeProps } from './interfaces';
import { TreeNodeItem } from './TreeNodeItem';

export const Tree: React.FC<TreeProps> = ({ getInitialData, getChildren, type }) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const initialData = await getInitialData(type);
            setTreeData(initialData);
        };

        fetchInitialData();
    }, [getInitialData, type]);

    const toggleChildren = (nodes: TreeNode[], id: string, newChildren?: TreeNode[]): TreeNode[] => {
        return nodes.map(node =>
            node.id === id
                ? { ...node, children: newChildren, isExpanded: !!newChildren }
                : { ...node, children: node.children ? toggleChildren(node.children, id, newChildren) : node.children }
        );
    };

    const toggleChildrenHandler = (id: string, newChildren?: TreeNode[]): void =>
        setTreeData(prevData => toggleChildren(prevData, id, newChildren));

    const nodeToggleHandler = async (id: string): Promise<void> => {
        const node = findNodeById(treeData, id);

        if (node && !node.isExpanded) {
            const newChildren = await getChildren(type, id);
            toggleChildrenHandler(id, newChildren);
        } else if (node && node.isExpanded) {
            toggleChildrenHandler(id);
        }
    };

    const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === id) {
                return node;
            } else if (node.children) {
                const childNode = findNodeById(node.children, id);
                if (childNode) {
                    return childNode;
                }
            }
        }
        return null;
    };

    const renderTreeNodes = (nodes: TreeNode[], level: number): JSX.Element[] => {
        return nodes.map(item => (
            <TreeNodeItem
                key={item.id}
                node={item}
                level={level}
                onToggle={nodeToggleHandler}
                renderTreeNodes={renderTreeNodes}
            />
        ));
    };

    return (
        <ul className="list-group-flush">
            {renderTreeNodes(treeData, 0)}
        </ul>
    );
};
