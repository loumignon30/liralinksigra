import http from "../../http-common";

class DenunciasTempoService {
  getAll(nomeComputador, tipoDenunciaTempo) {
    return http.get(`/denunciasTempo?nomeComputador=${nomeComputador}&tipoDenunciaTempo=${tipoDenunciaTempo}`);
  }

  create(data) {
    return http.post("/denunciasTempo", data);
  }
  // Search denuncias ID
  getID(id) {
    return http.get(`/denunciasTempo/${id}`);
  }

  update(id, data) {
    return http.put(`/denunciasTempo/${id}`, data);
  }
  // delete denuncias

  delete(id) {
    return http.delete(`/denunciasTempo/${id}`);
  }
}

export default new DenunciasTempoService();
