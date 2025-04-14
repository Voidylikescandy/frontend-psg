from retriever import search_with_threshold
from text_processing import substitute_template, parse_model_response
from config import MODEL, SYSTEMPROMPT, MODEL_URL, OPENAI_API
from openai import OpenAI, OpenAIError, ConflictError, NotFoundError, APIStatusError, RateLimitError, APITimeoutError, BadRequestError, APIConnectionError, AuthenticationError, InternalServerError, PermissionDeniedError, LengthFinishReasonError, UnprocessableEntityError, APIResponseValidationError, ContentFilterFinishReasonError, _AmbiguousModuleClientUsageError
from database import table
from logger import logger

import json

client_openai = OpenAI(api_key=OPENAI_API, base_url=MODEL_URL)

def generate_response(data: dict) -> str:
    if not isinstance(data, dict):
        logger.error("Invalid input: data must be a dictionary")
        return {"error": "ERR_INVALID_INPUT", "message": "Input data must be a dictionary"}

    if data.get("political-party") == "other":
        data["political-party"] = data.get("other-party", "")
        if not data["political-party"]:
            logger.warning("Other party selected but no party name provided")

    # Ensure emotional-appeal has a default value if not provided
    if "emotional-appeal" not in data or not data["emotional-appeal"]:
        data["emotional-appeal"] = "Neutral"
        
    # Ensure humor has a default value if not provided
    if "humor" not in data or not data["humor"]:
        data["humor"] = "Balanced"

    # Check if RAG should be enabled
    enable_rag = data.get("enable_rag", True)  # Default to True if not specified
    
    if enable_rag:
        # Only perform RAG if explicitly enabled
        q1 = data.get("candidate-name", "")
        if not q1:
            logger.error("Missing required field: candidate-name")
            return {"error": "ERR_MISSING_FIELD", "message": "Candidate name is required"}

        q3 = data.get("political-party", "")
        if not q3:
            logger.error("Missing required field: political-party")
            return {"error": "ERR_MISSING_FIELD", "message": "Political party is required"}

        query = f"{q1} {q3}"
        logger.info(f"Performing search with the query : {query}")
        
        try:
            data["retrieved_info"] = search_with_threshold(table, query, threshold=0.75)
            logger.info("Retrieved information successfully")
        except Exception as e:
            logger.error(f"Search operation failed: {e}")
            return {"error": "ERR_SEARCH_FAILED", "message": f"Failed to retrieve information: {str(e)}"}
    else:
        # If RAG is disabled, set retrieved_info to empty string
        logger.info("RAG is disabled. Skipping retrieval step.")
        data["retrieved_info"] = ""

    try:
        formatted_prompt = substitute_template(data)
        logger.info("Formatted prompt successfully")
        logger.debug(f"Full Prompt:\n {formatted_prompt}")
    except Exception as e:
        logger.error(f"Template substitution failed: {e}")
        return {"error": "ERR_TEMPLATE_FAILED", "message": f"Failed to format prompt: {str(e)}"}

    message_list = [
        {
            "role": "user",
            "content": formatted_prompt
        }
    ]

    try: 
        logger.info("Calling OpenAI API for response generation")
        response = client_openai.chat.completions.create(
            model=MODEL,
            max_tokens=16000,
            messages=[
                {"role": "system", "content": SYSTEMPROMPT},
                *message_list
            ],
            # tools=openai_tool_evaluation,
            # tool_choice='required',
            
            temperature=0.1,
            response_format={"type":"json_object"}
        )
        logger.info("Successfully received response from OpenAI API")
    except RateLimitError as e:
        logger.error(f"Rate limit exceeded: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Rate limit exceeded. Please try again later: {str(e)}"}
    except APITimeoutError as e:
        logger.error(f"API request timed out: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Request to OpenAI API timed out: {str(e)}"}
    except APIConnectionError as e:
        logger.error(f"Connection error with OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Failed to connect to OpenAI API. Check your network connection: {str(e)}"}
    except AuthenticationError as e:
        logger.error(f"Authentication error with OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Authentication failed. Check your API key: {str(e)}"}
    except PermissionDeniedError as e:
        logger.error(f"Permission denied by OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Permission denied to access the requested resource: {str(e)}"}
    except BadRequestError as e:
        logger.error(f"Bad request to OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Invalid request parameters sent to OpenAI API: {str(e)}"}
    except NotFoundError as e:
        logger.error(f"Resource not found in OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"The requested resource was not found. Check model name: {str(e)}"}
    except ConflictError as e:
        logger.error(f"Conflict error with OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Request conflicts with current state of the server: {str(e)}"}
    except InternalServerError as e:
        logger.error(f"Internal server error from OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"OpenAI API experienced an internal error. Try again later: {str(e)}"}
    except UnprocessableEntityError as e:
        logger.error(f"Unprocessable entity error from OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"The request was well-formed but unable to be processed: {str(e)}"}
    except ContentFilterFinishReasonError as e:
        logger.error(f"Content filter triggered in OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Response was filtered due to content safety policies: {str(e)}"}
    except LengthFinishReasonError as e:
        logger.error(f"Response length limit reached in OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Response was truncated due to token limit constraints: {str(e)}"}
    except APIResponseValidationError as e:
        logger.error(f"API response validation error from OpenAI: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"OpenAI API response failed validation: {str(e)}"}
    except APIStatusError as e:
        logger.error(f"API status error from OpenAI: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"OpenAI API returned an unexpected status code: {str(e)}"}
    except _AmbiguousModuleClientUsageError as e:
        logger.error(f"Ambiguous module client usage with OpenAI API: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Ambiguous usage of OpenAI client: {str(e)}"}
    except OpenAIError as e:
        logger.error(f"General OpenAI API error: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"An error occurred with the OpenAI API: {str(e)}"}
    except Exception as e:
        logger.error(f"Unexpected error occurred while generating response: {e}")
        return {"error": "ERR_API_FAILURE", "message": f"Failed to get response from OpenAI API: {str(e)}"}

    content = response.choices[0].message.content
    logger.debug(f"Raw response : {content}")
    
    if not content:
        logger.error("Received empty response from API")
        return {"error": "ERR_EMPTY_RESPONSE", "message": "Received empty response from API"}
        
    try:
        return parse_model_response(content)
    except Exception as e:
        logger.error(f"Failed to parse model response: {e}")
        return {"error": "ERR_PARSING_FAILURE", "message": f"Failed to parse model response: {str(e)}"}
