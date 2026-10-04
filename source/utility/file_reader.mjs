///-----------------------------------------------------------------------///
//file_reader.mjs
//File reading utilities
///-----------------------------------------------------------------------///

import { Logger } from "../engine/debug/logging.mjs";


///-----------------------------------------------------------------------///
//FileService class
export class FileService
{
    ///-----------------------------------------------------------------------///
    //LoadFile(relativePath)
    //@param relativePath the path to the file relative to the current html page
    //@return the response - e.g the caller can run response.json() or response.text(), etc
    static async LoadFile(relativePath) 
    {
        try 
        {
            // Path is relative to the HTML page currently loaded in the browser, not the JS file
            const response = await fetch(relativePath);
            
            if (!response.ok) 
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
            
        } catch (error) 
        {
            Logger.Error(error, "LoadFile(relativePath)", "FileService", "file_reader.mjs");
        }
    }
    ///-----------------------------------------------------------------------///
    
}
//End of FileReader class
///-----------------------------------------------------------------------///
