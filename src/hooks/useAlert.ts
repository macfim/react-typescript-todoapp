import { useState } from "react";

export interface IAlert {
  id: number;
  isVisible: boolean;
  title: string;
  description: string;
  status: "success" | "error";
}

const TIMEOUT = 3000;

export const useAlert = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const notifie = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    const id = new Date().getTime();

    setAlerts((prev) => [
      ...prev,
      {
        id,
        isVisible: true,
        title,
        description,
        status,
        timeout: setTimeout(() => {
          removeAlert(id);
        }, TIMEOUT),
      },
    ]);
  };

  return { alerts, removeAlert, notifie };
};
