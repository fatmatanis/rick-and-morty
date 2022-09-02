import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router";
import Navigation from "../../components/Navigation";
import { GetCharacter } from "../../queries/characters";
import LoadingSpinner from "../../components/LoadingSpinner";
import FavoriteButton from "../../components/FavoriteButton";
import CharacterDetailCard from "../../components/CharacterDetailCard";
import { ICharacterDetail } from "../../types/types";

function CharacterDetail() {
  const [characterDetail, setCharacterDetail] = useState<ICharacterDetail[]>(
    []
  );
  const [array, setArray] = useState<JSX.Element[]>([]);
  const location = useLocation();
  const pageUrlId = location.pathname.split("/").slice(2).toString();
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: { id: pageUrlId }
  });

  useEffect(() => {
    if (data) {
      setCharacterDetail([
        { title: "Status", text: data.character.status },
        { title: "Gender", text: data.character.gender },
        { title: "Species", text: data.character.species },
        { title: "Origin", text: data.character.origin.name },
        {
          title: "Type",
          text: data.character.type === "" ? "Unknown" : data.character.type
        },
        { title: "Location", text: data.character.location.name }
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (characterDetail?.length > 0) {
      setArray(
        characterDetail.map(({ title, text }: ICharacterDetail, index) => {
          return (
            <div key={index}>
              <CharacterDetailCard title={title} text={text} />
            </div>
          );
        })
      );
    }
  }, [characterDetail]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <>
      <div className="character-detail-top">
        <div className="character-detail-character">
          <Navigation colorStyles="white" />
          <div className="character-name-wrapper">
            <span className="character-name">{data.character.name}</span>
            <FavoriteButton favStyle="green" />
          </div>
          <div>
            <img
              className="character-image"
              src={data.character.image}
              alt={data.character.name}
            />
            <div>{array}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetail;
