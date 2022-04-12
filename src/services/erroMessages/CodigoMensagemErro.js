import { useTranslation } from "react-i18next";
import swal from "sweetalert";

function CodigoMensagemErro(props) {
    const { t } = useTranslation();

    return swal(
        t("mensagem_erro_menu_atencao"),
        t("O Código Existe com uma outra Sede"),
        "warning"
      );

// return getRoleArray;
}

export { CodigoMensagemErro as default } // no semi-colon