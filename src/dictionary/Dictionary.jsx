import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { GiSpeaker } from "react-icons/gi";

const Dictionary = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const options = {
                url: `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`,
                mwthod: "get"
            };
            const response = await axios(options);
            // console.log(response, "response");
            setData(response.data);
        } catch (error) {
            // console.log(error, "error");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Dictionary</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        value={searchWord}
                        onChange={event => setSearchWord(event.target.value)}
                        fullWidth
                        required
                        label="Search word here"
                        placeholder="Search word here"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >{isLoading ? <CircularProgress sx={{ padding: "10px" }} /> : "Search"}</Button>
                </form>

                <div className={styles.outputContainer}>
                    {data && data.map((word, index) => (
                        <div key={index} className={styles.wordContainer}>
                            <div className={styles.theWord}>{word.word}</div>
                            <div className={styles.meaningsContainer}>
                                {word.meanings.map((meaning, index) => (
                                    <div className={styles.meaning} key={index}>
                                        <div className={styles.partOfSpeech}>
                                            <span className={styles.partOfSpeechHeading}>Part of speech</span>
                                            &nbsp;{meaning.partOfSpeech}
                                        </div>
                                        <div className={styles.synonyms}>
                                            {meaning.synonyms.length > 0 && <>
                                                <div className={styles.synonymsHeading}>Synonyms:</div>
                                                {meaning.synonyms.map((synonym, index) => (
                                                    <span className={styles.synonym} key={index}>{synonym}</span>
                                                ))}
                                            </>}
                                        </div>
                                        <div className={styles.antonyms}>
                                            {meaning.antonyms.length > 0 && <>
                                                <div className={styles.antonymsHeading}>Antonyms:</div>
                                                {meaning.antonyms.map((antonym, index) => (
                                                    <span className={styles.antonym} key={index}>{antonym}</span>
                                                ))}
                                            </>}
                                        </div>
                                        <div className={styles.definitions}>
                                            <div className={styles.definitionHeading}>Definition:</div>
                                            {meaning.definitions.map((item, index) => (
                                                <div className={styles.definitionExample} key={index}>
                                                    <div className={styles.definition}>{item.definition}</div>
                                                    <div className={styles.example}>{item.example && <>e.g. {item.example}</>}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dictionary

