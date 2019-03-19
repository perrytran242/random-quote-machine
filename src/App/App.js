import React, { Component } from 'react';
import QuoteGenerator from '../QuoteGenerator/QuoteGenerator';
import './style.css';
import axios from 'axios';

class App extends Component {
    state = {
        quotesArr: [],
        quote: '',
        randomColor: '',
        author: '',
        fading: false,
    }

    componentDidMount() {
        this.quoteGenerator();
        
        setTimeout(() => {
            this.getRandomQuote();    
        }, 15);
    }

    getRandomBackgb() {
        const rgb = {
            r: Math.floor( Math.random() * 256),
            g: Math.floor( Math.random() * 256),
            b: Math.floor( Math.random() * 256)
        }
        this.setState({randomColor: `rgb(${rgb.r},${rgb.g},${rgb.b})`});
    }

    quoteGenerator = async () => {
      try {
        const resp = await axios.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10');
        console.log("RESPONSE:", resp);
        resp.data.splice(5,1);
        this.setState({quotesArr: resp.data});

      } catch( err) {
          console.log(err);
      }         
    }

    fadeText(newQuote, quoteAuthor) {
        this.setState({fading : true})

        this.timer = setTimeout(() => {
            this.setState({quote: newQuote, author: quoteAuthor});
            this.setState({fading: false});
        }, 500);
    }

    getRandomQuote = () => {
        //get random number and pass that number into the quotes dummy data
        let randomNum = Math.floor( Math.random() * this.state.quotesArr.length);
        let quote = this.state.quotesArr[randomNum].content;
        let author = this.state.quotesArr[randomNum].title;

        const regex = /(<([^>]+)>)/ig;
        const numberRegex = /[0-9]/g;

        quote = quote.replace(regex, '').replace(/[^A-Z0-9]/ig, ' ').replace(numberRegex, ' ');
        
        this.fadeText(quote, author);
        this.getRandomBackgb();

    }

    render() {     
        // console.log(this.state);   
        
        return (
            <div style={{backgroundColor: this.state.randomColor}} className="container">
                
                <QuoteGenerator fading={this.state.fading} author={this.state.author} getRandomQuote={this.getRandomQuote} quote={this.state.quote}/>
                
            </div>
        )
    }
}

export default App;