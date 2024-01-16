import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Greeting from "./Greeting";


describe('Greeting component', ()=>{
    test('renders Hello world as a text', ()=>{
        //Arrange
        render(<Greeting/>);
    
        //Act
        //...nothing
    
        //Assert
        const helloWorldElement = screen.getByText('Hello World');
        expect(helloWorldElement).toBeInTheDocument();
    });
    test('render good to see you if button was not clicked',()=>{
        render(<Greeting/>);
        const outputElement = screen.getByText('good to see you', {exact:false});
        expect(outputElement).toBeInTheDocument();
    });
    test('render "Changed" if button was clicked',()=>{
        //Arrange
        render(<Greeting/>);

        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
 
        //Assert
        const outputElement = screen.getByText('Changed!');
        expect(outputElement).toBeInTheDocument();
    });
    test('does not render "good to see you" if button was clicked',()=>{
        //Arrange
        render(<Greeting/>);

        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
 
        //Assert
        const outputElement = screen.queryByText('good to see you', {exact:false});
        expect(outputElement).toBeNull();
    });
});