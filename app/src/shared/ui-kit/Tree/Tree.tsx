import React, { useState } from 'react';
import { TreeNode, TreeProps } from './interfaces.ts';
import cubes from './data/cubes.json'
import views from './data/views.json';
import dummy from './data/dummy.json'

export const Tree: React.FC<TreeProps> = ({ data }) => {
    const [treeData, setTreeData] = useState<TreeNode[]>(data);

    const toggleChildren = (nodes: TreeNode[], id: string, newChildren?: TreeNode[]): TreeNode[] =>{
        return nodes.map(node =>
            node.id === id
                ? {...node, children: newChildren, isExpanded: !!newChildren}
                : {...node, children: node.children ? toggleChildren(node.children, id, newChildren) : node.children}
        );
    }

    const toggleChildrenHandler = (id: string, newChildren?: TreeNode[]): void =>
        setTreeData(prevData => toggleChildren(prevData, id, newChildren));

    const nodeToggleHandler = (id: string): void => {
        const node = findNodeById(treeData, id);

        if (node && !node.isExpanded) {
            switch (id) {
                case 'A1_Distribution':
                    toggleChildrenHandler(id, cubes.value);
                    break;
                case 'Продажи':
                    toggleChildrenHandler(id, views.value);
                    break;
                default:
                    toggleChildrenHandler(id, dummy.value);
                    break;
            }
        } else if (node && node.isExpanded) toggleChildrenHandler(id);
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
        return (
            nodes.map(item => (
                <li className='list-group-item pt-0 pb-0 rounded-0' key={item.id}>
                    {level < 2 && item.type != 'dummy' ? (
                        <details onToggle={(e) => {
                            e.stopPropagation();
                            nodeToggleHandler(item.id);
                        }}>
                            <summary>{item.name}</summary>
                            {item.children &&
                                <ul>
                                    {renderTreeNodes(item.children, level + 1)}
                                </ul>
                            }
                        </details>
                    ) : (
                        <>
                            <span>{item.name}</span>
                            {item.children &&
                                <ul>
                                    {renderTreeNodes(item.children, level + 1)}
                                </ul>
                            }
                        </>
                    )}
                </li>
            ))
        )
    };

    return (
        <ul className="list-group-flush">
            {renderTreeNodes(treeData, 0)}
        </ul>
    );
};
