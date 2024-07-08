'use client'
// src/pages/managers.tsx
import React, { useEffect, useState } from 'react';
import ManagerCard from '@/ui/ManagerCard/ManagerCard';
import { fetchManager } from '@/lib/myData';
import { ManagerField } from '@/lib/definitions';

const ManagersPage: React.FC = () => {
    const [managers, setManagers] = useState<ManagerField[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const data = await fetchManager();
                setManagers(data);
            } catch (error) {
                console.error("Failed to fetch managers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchManagers();
    }, []);

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <ManagerCard  />
        </div>
    );
};

export default ManagersPage;
