import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, TextField } from "@mui/material";
import {
    FaCodepen,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaPatreon,
    FaYoutube,
} from "react-icons/fa";
import { FiArrowUp, FiCoffee, FiGlobe, FiHeart, FiMail, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: FaLinkedinIn,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        icon: FaFacebookF,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        icon: FaYoutube,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: FiHeart,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/a2rp",
        icon: FiCoffee,
    },
    { label: "Patreon", href: "https://www.patreon.com/a2rp", icon: FaPatreon },
];

const Dictionary = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [data, setData] = useState([]);
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 280);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const word = searchWord.trim().toLowerCase();
        if (!word) return;

        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=dps&max=1`,
            );

            if (!response.data.length) throw new Error("Word not found");

            const result = response.data[0];
            const definitions = (result.defs || []).map((definition) => ({
                definition: definition.replace(/^[a-z]+\t/, ""),
                example: "",
            }));

            setData([
                {
                    word: result.word,
                    meanings: [
                        {
                            partOfSpeech: (result.tags || []).find((tag) =>
                                tag.startsWith("base"),
                            )
                                ? "verb"
                                : "word",
                            synonyms: [],
                            antonyms: [],
                            definitions,
                        },
                    ],
                },
            ]);
        } catch (error) {
            setData([]);
            toast.error(
                error.message === "Word not found"
                    ? "Word not found. Try another search."
                    : "Dictionary service is temporarily unavailable.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a className={styles.brand} href="./" aria-label="Dictionary home">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <strong>Dictionary</strong>
                        <small>Find clear meanings fast</small>
                    </span>
                </a>
                <a
                    className={styles.headerLink}
                    href="https://github.com/a2rp/dictionary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub aria-hidden="true" />
                    <span>Source</span>
                </a>
            </header>

            <main className={styles.main}>
                <section className={styles.intro}>
                    <span className={styles.eyebrow}>WORD EXPLORER</span>
                    <h1>Dictionary</h1>
                    <p>Search a word to explore its meaning and part of speech.</p>
                </section>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        value={searchWord}
                        onChange={(event) => setSearchWord(event.target.value)}
                        fullWidth
                        required
                        label="Search word"
                        placeholder="Try a word like resilient"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className={styles.submitButton}
                        startIcon={isLoading ? null : <FiSearch />}
                    >
                        {isLoading ? <CircularProgress size={22} /> : "Search"}
                    </Button>
                </form>

                <div className={styles.outputContainer} aria-live="polite">
                    {data.map((word) => (
                        <div key={word.word} className={styles.wordContainer}>
                            <div className={styles.theWord}>{word.word}</div>
                            <div className={styles.meaningsContainer}>
                                {word.meanings.map((meaning) => (
                                    <div className={styles.meaning} key={meaning.partOfSpeech}>
                                        <div className={styles.partOfSpeech}>
                                            <span className={styles.partOfSpeechHeading}>
                                                Part of speech
                                            </span>
                                            <span>{meaning.partOfSpeech}</span>
                                        </div>

                                        {meaning.synonyms.length > 0 && (
                                            <div className={styles.synonyms}>
                                                <div className={styles.synonymsHeading}>Synonyms</div>
                                                {meaning.synonyms.map((synonym) => (
                                                    <span className={styles.synonym} key={synonym}>
                                                        {synonym}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {meaning.antonyms.length > 0 && (
                                            <div className={styles.antonyms}>
                                                <div className={styles.antonymsHeading}>Antonyms</div>
                                                {meaning.antonyms.map((antonym) => (
                                                    <span className={styles.antonym} key={antonym}>
                                                        {antonym}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className={styles.definitions}>
                                            <div className={styles.definitionHeading}>Definition</div>
                                            {meaning.definitions.map((item, index) => (
                                                <div className={styles.definitionExample} key={`${item.definition}-${index}`}>
                                                    <div className={styles.definition}>{item.definition}</div>
                                                    {item.example && (
                                                        <div className={styles.example}>e.g. {item.example}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className={styles.footer}>
                <div>
                    Copyright © {new Date().getFullYear()} {" "}
                    <a
                        href="https://www.ashishranjan.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                </div>
                <nav className={styles.footerLinks} aria-label="Footer links">
                    {footerLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            aria-label={label}
                            title={label}
                        >
                            <Icon aria-hidden="true" />
                        </a>
                    ))}
                </nav>
            </footer>

            <button
                type="button"
                className={`${styles.goTop} ${showTopButton ? styles.show : ""}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Go to top"
                title="Go to top"
            >
                <FiArrowUp aria-hidden="true" />
            </button>
        </div>
    );
};

export default Dictionary;
