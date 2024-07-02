import React from "react";
import {Toggle} from "./Toggle.tsx";
import {TreeNode} from "./interfaces.ts";
import './treeNodeItem.css';

interface TreeNodeItemProps {
    node: TreeNode;
    level: number;
    onToggle: (id: string) => void;
    renderTreeNodes: (nodes: TreeNode[], level: number) => JSX.Element[];
}

export const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, level, onToggle, renderTreeNodes }) => {

    return (
        <li className="list-group-item pt-1 pb-0 rounded-0" key={node.id}>
            <Toggle isExpanded={node.isExpanded || false} onClick={() => onToggle(node.id)} level={level}
                    name={node.name} type={node.type}/>

            <div className={`tree-node ${node.isExpanded ? 'expanded' : 'collapsed'}`}>
                    {node.children && node.isExpanded && node.type !== 'dummy' && level < 2 && (
                        <ul>{renderTreeNodes(node.children, level + 1)}</ul>
                    )}
            </div>
        </li>
    );
};