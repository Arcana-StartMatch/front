import React, { useState } from "react";
import "./form.css";

export default function Form() {
  const [form_1, setValue1] = useState("");
  const [form_2, setValue2] = useState("");
  const [form_3, setValue3] = useState("");
  const [form_4, setValue4] = useState("");
  // const [tri_value, setValue2] = useState(1);
  const inputChange = function (e, form_id) {
    switch (form_id) {
      case 1:
        setValue1(e.target.value);
        break;
      case 2:
        setValue2(e.target.value);
        break;
      case 3:
        setValue3(e.target.value);
        break;
      case 4:
        setValue4(e.target.value);
        break;
      default:
        alert("Ce champ n'est pas pris en compte !");
    }
  };
  const submit_data = function () {
    fetch("http://localhost:5000/", {
      method: "POST",
      data: {
        data1: form_1,
        data2: form_2,
        data3: form_3,
        data4: form_4,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok == "NON") {
          alert("Une erreur s'est produite à l'envoi du formulaire");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="forms">
      <table className="forms_els">
        <tbody>
          <tr>
            <th className=" th">
              <h1>Formulaire</h1>
            </th>
            <td className="td"></td>
          </tr>
          <tr className="form_div">
            <th className=" th">
              <label htmlFor="input1">Donnée 1 :</label>
            </th>
            <td className="td">
              <input
                type="texte"
                id="input1"
                value={form_1}
                onChange={(e) => inputChange(e, 1)}
                className="donnees"
              />
            </td>
          </tr>
          <tr className="form_div">
            <th className="th">
              <label htmlFor="input2">Donnée 2 :</label>
            </th>
            <td className="td">
              <input
                type="texte"
                id="input2"
                value={form_2}
                onChange={(e) => inputChange(e, 2)}
                className="donnees"
              />
            </td>
          </tr>
          <tr className="form_div">
            <th className="th">
              <label htmlFor="input3">Donnée 3 :</label>
            </th>
            <td className="td">
              <input
                type="texte"
                id="input3"
                value={form_3}
                onChange={(e) => inputChange(e, 3)}
                className="donnees"
              />
            </td>
          </tr>
          <tr className="form_div">
            <th className="th">
              <label htmlFor="input4">Donnée 4 :</label>
            </th>
            <td className="td">
              <input
                type="texte"
                id="input4"
                value={form_4}
                onChange={(e) => inputChange(e, 4)}
                className="donnees"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="th">
        <button id="valider_btn" onClick={submit_data}>
          Valider
        </button>
      </div>
    </div>
  );
}
