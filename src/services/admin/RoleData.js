import { useTranslation } from "react-i18next";

function RoleDataInfo(props) {
    const { t } = useTranslation();

    const getRoleArray = [
        { id: 1, title: t('role_administrador') },
        { id: 2, title: t('role_Funcionario') },
        { id: 3, title: t('role_utilizador') },
        { id: 101, title: t('role_super_user') }
       
    ];

return getRoleArray;
}

export { RoleDataInfo as default } // no semi-colon