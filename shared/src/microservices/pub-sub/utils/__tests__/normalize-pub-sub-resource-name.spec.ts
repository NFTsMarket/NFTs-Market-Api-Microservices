import { InvalidPubSubResourceNameError } from "@shared/errors/pub-sub/invalid-pub-sub-resource-name.error";
import { normalizePubSubResourceName } from "../normalize-pub-sub-resource-name.util";

describe("NormalizePubSubResourceName", () => {
  it("should return an error given undefined", () => {
    expect(() => normalizePubSubResourceName(undefined)).toThrow(
      InvalidPubSubResourceNameError
    );
  });

  it("should return an error given null", () => {
    expect(() => normalizePubSubResourceName(null)).toThrow(
      InvalidPubSubResourceNameError
    );
  });

  it("should return an error given an empty string", () => {
    expect(() => normalizePubSubResourceName("")).toThrow(
      InvalidPubSubResourceNameError
    );
  });

  it.each([
    ['"created-car"', [], "created-car"],
    ['"created car"', [], "created-car"],
    ['"created car"', ["do"], "do-created-car"],
    ['"created car"', ["do", "development"], "do-development-created-car"],
  ])(
    "should return a valid pub sub resource name if given a plain string ",
    (input: string, seeds: string[], expectedRes: string) => {
      // act
      const res = normalizePubSubResourceName(input, seeds);

      // assert

      expect(res).toEqual(expectedRes);
    }
  );

  it.each([
    ['{ "type": "created-car" }', [], "created-car"],
    ['{ "type": "updated car" }', [], "updated-car"],
    ['{ "type": "updated car" }', ["do"], "do-updated-car"],
    [
      '{ "type": "updated car" }',
      ["do", "development"],
      "do-development-updated-car",
    ],
  ])(
    "should return a valid pub sub resource name if given a valid JSON ",
    (input: string, seeds: string[], expectedRes: string) => {
      // act
      const res = normalizePubSubResourceName(input, seeds);

      // assert

      expect(res).toEqual(expectedRes);
    }
  );
});
