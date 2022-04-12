import { useTranslation } from "react-i18next";

function StatusDataInfo(props) {
  const { t } = useTranslation();

  const getStatus = [
    { id: 1, title: t("status_actif") },
    { id: 2, title: t("status_inactive") },
    { id: 3, title: t("status_pendente") },
    { id: 4, title: t("status_apagado") },
  ];
  return getStatus;
}

export { StatusDataInfo as default }; // no semi-colon
