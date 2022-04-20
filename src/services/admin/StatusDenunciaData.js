import { useTranslation } from "react-i18next";

function StatusDataInfo(props) {
  const { t } = useTranslation();

  const getStatus = [
    { id: 1, title: t("status_pendente") },
    { id: 2, title: t("status_encurso") },
    { id: 3, title: t("status_concluido") },
    { id: 4, title: t("status_sem_objeto") },
  ];
  return getStatus;
}

export { StatusDataInfo as default }; // no semi-colon
