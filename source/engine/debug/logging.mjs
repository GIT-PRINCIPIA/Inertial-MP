///-----------------------------------------------------------------------///
//logging.mjs
//Custom logger
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//Logger class
export class Logger
{
    static logger;


    ///-----------------------------------------------------------------------///
    //Error(err, funcName, className, fileName)
    //@param err the error info
    //@param funcName the name of the originating function
    //@param className the name of the originating class
    //@param fileName the name of the originating file
    static Error(err, funcName, className, fileName)
    {
        Logger.logger.Error(err, funcName, className, fileName);
    }
    ///-----------------------------------------------------------------------///


    
}
//End of DebugError class
///-----------------------------------------------------------------------///


///-----------------------------------------------------------------------///
//ConsoleLogger class
export class ConsoleLogger
{
    ///-----------------------------------------------------------------------///
    //Error(err)
    //@param err the error to log
    Error(err, funcName, className, fileName)
    {
        let txt =        "\n";
        txt +=           "------------------------------------\n";
        txt +=           "Error:\n";
        txt +=           "  - in file " + fileName + "\n";
        if (className.length > 0) 
            txt +=       "      - in class " + className + "\n";
        if (funcName.length > 0) 
            txt +=       "          - in function " + funcName + "\n";
        txt +=           "Info:\n";
        txt +=           err + "\n";
        txt +=           "------------------------------------\n";
        console.error(txt);
    }
    ///-----------------------------------------------------------------------///
}
//End of ConsoleLogger class
///-----------------------------------------------------------------------///