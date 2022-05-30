import {Application} from "./Application";

describe('Application', () => {
    test('domain should be ok', () => {
        expect(new Application().hello()).toEqual("hello");
    });
});

