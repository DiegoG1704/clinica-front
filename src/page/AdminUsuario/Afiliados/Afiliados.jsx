import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Navbar from '../Navar/Navar';

const sampleData = [
    {
        key: '0',
        data: { name: 'Applications', size: '3 MB', type: 'Folder' },
        children: [
            {
                key: '0-0',
                data: { name: 'React', size: '1 MB', type: 'Library' },
                children: [
                    {
                        key: '0-0-0',
                        data: { name: 'React Router', size: '200 KB', type: 'Library' },
                    },
                    {
                        key: '0-0-1',
                        data: { name: 'Redux', size: '300 KB', type: 'Library' },
                    }
                ]
            },
            {
                key: '0-1',
                data: { name: 'Angular', size: '2 MB', type: 'Framework' },
            },
            {
                key: '0-2',
                data: { name: 'Vue', size: '1.5 MB', type: 'Framework' },
            }
        ]
    },
    {
        key: '1',
        data: { name: 'Documents', size: '5 MB', type: 'Folder' },
        children: [
            {
                key: '1-0',
                data: { name: 'Reports', size: '2 MB', type: 'Folder' },
                children: [
                    {
                        key: '1-0-0',
                        data: { name: '2023 Report', size: '1 MB', type: 'PDF' },
                    },
                    {
                        key: '1-0-1',
                        data: { name: '2022 Report', size: '1 MB', type: 'PDF' },
                    }
                ]
            }
        ]
    }
];

export default function Afiliados() {
    const [nodes, setNodes] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState(null);

    const toggleApplications = () => {
        let _expandedKeys = { ...expandedKeys };

        if (_expandedKeys['0']) delete _expandedKeys['0'];
        else _expandedKeys['0'] = true;

        setExpandedKeys(_expandedKeys);
    };

    useEffect(() => {
        setNodes(sampleData);
    }, []);

    return (
        <>
        <Navbar/>
            <div className="card">
                <Button onClick={toggleApplications} label="Toggle Applications" />
                <TreeTable value={nodes} expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} className="mt-4" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>
            </div>
        </>
    );
}
