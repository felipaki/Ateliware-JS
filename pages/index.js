import Head from 'next/head';
import $ from 'jquery';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //*** Busca
    $.ajax({
      url: 'https://api.github.com/search/repositories?q={' + $('#topic').val() + '}' ,
      data:{
          client_id: 'Iv1.15ee52be6b06193d',
          client_secret: 'd6d4101c251525b25da1bf3392094d4073f850fc',
          page: 1,
          per_page: 5
      }
    }).done(function(repos) {
      $.each(repos.items, function(idex, repo) {
        $('#repos').append(`
          <div class="card-header my-2 py-3">
            <div class="row">
              <div class="col-md-7">
                  <strong>${repo.name}</strong> : ${repo.description}
              </div>
              <div class="col-md-3">
                <p class="badge badge-primary p-2" style='color: #000000;'>Downloads: ${repo.forks_count}</p>
                <p class="badge badge-dark p-2" style='color: #000000;'>Observadores: ${repo.watchers_count}</p>
                <p class="badge badge-success p-2" style='color: #000000;'>Estrelas: ${repo.stargazers_count}</p>
              </div>
              <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-info">Acessar</a>
              </div>
            </div>
          </div>
        `);

        //*** Gravação
        $.ajax({
          url: `/api/?id=${repo.id}&name=${repo.name}`
        }).done(function(ret) {
          console.log(ret.data);
        });
      });
      console.clear();
    });
    console.clear();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>App Teste</title>
        <meta name="description" content="App Teste" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <main className="form-finding">
          <form onSubmit={handleSubmit} className={styles.container}>
            <div className="form-floating">
              <input type="text" className="form-control" id="topic" placeholder=""></input>
              <label htmlFor="floatingInput">Busca por Tecnologia GitHub</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary btnFind" id="btnFind">Procurar</button>
          </form>
        </main>
        <main className="container" id="repos"></main>    
      </main>
    </div>
  )
}