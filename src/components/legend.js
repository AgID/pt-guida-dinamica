import React from "react";

const Legend = () => {
  const output = (
    <ul
      style={{
        listStyleType: "none",
        columns: "2",
        fontSize: "0.8rem"
      }}
      className="mt-5 p-0"
    >
      <li className="d-flex mb-3">
        <img
          src="/images/pianificata.svg"
          alt="ripianificata"
          className="mr-3"
        />
        Linea d’azione ripianificata nei tempi e/o contenuti in una linea
        d’azione del nuovo PT
      </li>
      <li className="d-flex mb-3">
        <img src="/images/conclusa.svg" alt="conclusa" className="mr-3" />
        Linea d’azione conclusa
      </li>
      <li className="d-flex mb-3">
        <img src="/images/risultati.svg" alt="risultati" className="mr-3" />
        Linea d’azione i cui risultati sono alla base di una linea d’azione del
        nuovo PT
      </li>
      <li className="d-flex mb-3">
        <img src="/images/ritardo.svg" alt="ritardo" className="mr-3" />
        Linea d’azione parzialmente in ritardo
      </li>
      <li className="d-flex mb-3">
        <img src="/images/ricorrente.svg" alt="ricorrente" className="mr-3" />
        Linea d’azione relativa ad una attività ricorrente
      </li>
      <li className="d-flex mb-3">
        <img src="/images/evolve.svg" alt="evolve" className="mr-3" />
        Linea d’azione che si evolve in un contesto meglio definito nel nuovo PT
      </li>
      <li className="d-flex mb-3">
        <img src="/images/prosegue.svg" alt="prosegue" className="mr-3" />
        Linea d’azione che prosegue in una linea d’azione del nuovo PT
      </li>
      <li className="d-flex mb-3">
        <img src="/images/necessaria.svg" alt="necessaria" className="mr-3" />
        Linea d’azione necessaria per qualificare meglio il percorso avviato
        nello stesso macro ambito
      </li>
    </ul>
  );
  return output;
};

export default Legend;
