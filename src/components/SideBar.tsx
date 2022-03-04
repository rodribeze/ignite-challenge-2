import { useEffect, useState } from "react";

import '../styles/sidebar.scss';

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

import { api } from '../services/api';
import { Button } from "./Button";

interface SideBarProps {
    selectedGenreId: number,
    onSelectGenre: (id: number) => void;
}

export function SideBar({
    selectedGenreId,
    onSelectGenre
}: SideBarProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (<nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => onSelectGenre(genre.id)}
        selected={selectedGenreId === genre.id}
      />
    ))}
  </div>

</nav>)
  
}