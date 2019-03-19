import React, { Component } from 'react';
import './style.css';



class QuoteGenerator extends Component {

    render() {
        const { fading, author } = this.props;
        console.log(author);
        return (
            <div className="quote-container">
                { this.props.quote &&
                    <div id="quote-box">                        
                        <p className={fading ? "quote faded" : "quote fade-in"} id="text">{ this.props.quote }</p>
                        <p id="author" className={fading? "quote faded" : "quote fade-in"}>- {author}</p>
                    </div>            
                }   
                <div id="new-quote" className='btn-container'>                    
                    <button onClick={this.props.getRandomQuote}>New Quote</button>
                </div>
            </div>
        )
    }
}

export default QuoteGenerator;