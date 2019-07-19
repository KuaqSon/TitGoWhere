import React, { Component } from "react";

class Quote extends Component {
  state = {
    quoteText: "",
    author: ""
  };

  componentDidMount() {
    this.loadQuote();
  }

  loadQuote = () => {
    const dateGetQuote = localStorage.getItem("dateGetQuote");
    const today = new Date();
    const isOld = today.getDate().toString() !== dateGetQuote;

    if (isOld) {
      this.fetchNewQuote();
    } else {
      this.setQuote();
    }
  };

  fetchNewQuote = () => {
    fetch("http://quotes.rest/qod.json?category=funny")
      .then(resp => resp.json())
      .then(resp => {
        const {
          contents: { quotes }
        } = resp;
        if (quotes && quotes.length > 0) {
          const today = new Date();
          localStorage.setItem("dateGetQuote", today.getDate());
          localStorage.setItem("quote", JSON.stringify(quotes[0]));

          this.setState({
            quoteText: quotes[0].quote,
            author: quotes[0].author
          });
        }
      })
      .catch(e => {});
  };

  setQuote = () => {
    const quoteString = localStorage.getItem("quote");
    const quote = JSON.parse(quoteString);

    this.setState({
      quoteText: quote.quote,
      author: quote.author
    });
  };

  render() {
    const { quoteText, author } = this.state;
    return (
      <div>
        <div className="text-center">{quoteText}</div>
        <div className="text-right">{author}</div>
      </div>
    );
  }
}

export default Quote;
