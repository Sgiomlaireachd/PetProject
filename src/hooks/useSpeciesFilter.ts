import {useState} from 'react';
import {fetchSpecies} from '../axios';

const useSpeciesFilter = () => {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [species, setSpecies] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(false);

  const loadSpecies = () => {
    if (species.length) return;

    setSpeciesLoading(true);
    fetchSpecies()
      .then(setSpecies)
      .catch(showError)
      .finally(() => setSpeciesLoading(false));
  };

  const showError = (error: Error) => console.warn(error);

  const toggleSelectSpecies = (species: any) => {
    const isAlreadySelected = selectedSpecies.find(
      item => item === species.url,
    );

    if (isAlreadySelected) {
      setSelectedSpecies(prevSpecies =>
        prevSpecies.filter(item => item !== species.url),
      );
    } else {
      setSelectedSpecies(prevSpecies => [...prevSpecies, species.url]);
    }
  };

  return [
    species,
    selectedSpecies,
    {loadSpecies, toggleSelectSpecies, speciesLoading},
  ];
};

export default useSpeciesFilter;
