import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// get youtube video id
// function getVideoId(url) {
//   const videoId = url.split("v=")[1];
//   const ampersandPosition = videoId.indexOf("&");
//   if(ampersandPosition !== -1) {
//     return videoId.substring(0, ampersandPosition);
//   }
//   return videoId;
// }

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: evento => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value
      });
    },
    clearForm() {
      setValues({});
    }
  };
}

const  PROJECT_URL = "https://gimhhlqqwtjxdctatkqu.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbWhobHFxd3RqeGRjdGF0a3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTE2MTUsImV4cCI6MTk4Mzc2NzYxNX0.Y8AOrzelig81wpecDzQJzaa1p5DBo6PH5KaKfwMNXAc";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "FIFA 23 | Trailer Oficial de Lançamento | O Jogo de Todo Mundo", url: "https://www.youtube.com/watch?v=0tIW1X2dv0c" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={evento => {
            evento.preventDefault();

            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos"
            })
            .then((oqueveio) => {
              console.log(oqueveio);
            })
            .catch((err) => {
              console.log(err);
            })

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
