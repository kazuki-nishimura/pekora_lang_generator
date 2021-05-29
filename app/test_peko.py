import json

import peko_lang

json_path = './json_folder/'
with open(json_path + "test_sentence.json") as f:
    test_json = json.load(f)

def test_translate_peko():
    score = 0
    times = len(test_json)
    for i in range(times):
        temp_dict = test_json[i]
        peko_sentence = peko_lang.peko_main(temp_dict['original'])
        if temp_dict['peko'] != peko_sentence:
            print(f"{i}: ×")
            print(f"Translated: {peko_sentence}")
            print(f"Answer: {temp_dict['peko']}")
        else:
            score += 1

    if score == times:
        print("All Clear")
    else:
        print("-------------------------")
        print("Not All Clear")
        print(f"Score: {score}/{times}")

test_translate_peko()
