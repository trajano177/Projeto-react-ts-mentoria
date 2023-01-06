import styles from "./Profile.module.css";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface apiDate {
  avatar_url: string;
  followers: number;
  public_repos: number;
  name: string;
  bio: string;
}

interface afc {
  public_repos: number;
  full_name: string;
  description: string;
  html_url: string;
  id: number;
}

export function Profile() {
  const { user } = useParams();
  const [listUser, setListUser] = useState<apiDate>({} as apiDate);
  const [repos, setRepos] = useState<afc[]>([]);
  console.log(user);

  async function reqUser() {

    
     await axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        setListUser(response.data);
      })
      .catch((e) => console.log(e));
  }

  async function reqRepos() {
    await axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then((res) => {
        setRepos(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
   reqUser();
   reqRepos();
  }, []);
  return (
    <>
      <div className={styles.details}>
        <img src={listUser.avatar_url} alt="" />

        <div className={styles.user}>
          <div className={styles.details_user}>
            <div className={styles.followers_details}>
              <p>{listUser.followers}</p>
              <p>Seguidores</p>
            </div>

            <div className={styles.followers_details}>
              <p>{listUser.followers}</p>
              <p>Seguindo</p>
            </div>
            <div className={styles.followers_details}>
              <p>{listUser.public_repos}</p>
              <p>Repositórios</p>
            </div>
          </div>
          <div className={styles.username_details}>
            <h3>{listUser.name}</h3>
            <p>{listUser.bio}</p>
          </div>
        </div>
      </div>

      <div>
        {repos &&
          repos.map((repo) => {
            console.log(repo);

            return (

              <Card
                key={repo.id}
                username={repo.full_name}
                description={repo.description}
                image={listUser.avatar_url}
                route={repo.html_url}
              />

            );
          })}
      </div>
    </>
  );
}
