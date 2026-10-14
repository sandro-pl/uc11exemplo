test("Exemplo: toBe", async () => {
expect(2 + 3).toBe(5);
});

test("Exemplo: toEqual", async () => {
expect({status: 'ok'}).toEqual({status: 'ok'});
});

test("Exemplo: toStrictEqual", async () => {
expect({id: 1, email: undefined}).toStrictEqual({id: 1, email: undefined});
});

test("Exemplo: toBeCloseTo", async () => {
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
});

test("Exemplo: not", async () => {
expect(5).not.toBe(0);
});

test("Exemplo: toBeGreaterThan", async () => {
expect(8).toBeGreaterThan(7);
});

test("Exemplo: toBeGreaterThanOrEqual", async () => {
expect(7).toBeGreaterThanOrEqual(7);
});

test("Exemplo: toBeLessThan", async () => {
expect(24.5).toBeLessThan(25);
});

test("Exemplo: toBeLessThanOrEqual", async () => {
expect(10).toBeLessThanOrEqual(10);
});

test("Exemplo: toMatch", async () => {
expect('Situação: aprovado').toMatch(/aprovado$/);
});

test("Exemplo: toContain", async () => {
expect(['teste', 'implantação']).toContain('teste');
});

test("Exemplo: toContainEqual", async () => {
expect([{id: 1}, {id: 2}]).toContainEqual({id: 2});
});

test("Exemplo: toHaveLength", async () => {
expect([10, 20, 30]).toHaveLength(3);
});

test("Exemplo: toHaveProperty", async () => {
expect({versao: '1.0.0'}).toHaveProperty('versao', '1.0.0');
});

test("Exemplo: toThrow", async () => {
expect(() => {throw new Error('Entrada inválida');}).toThrow(/inválida/);
});

test("Exemplo: toBeTruthy", async () => {
expect('preenchido').toBeTruthy();
});

test("Exemplo: toBeFalsy", async () => {
expect(0).toBeFalsy();
});

test("Exemplo: toBeNull", async () => {
expect(null).toBeNull();
});

test("Exemplo: toBeUndefined", async () => {
expect(undefined).toBeUndefined();
});

test("Exemplo: toBeDefined", async () => {
expect({id: 1}.id).toBeDefined();
});

test("Exemplo: toMatchObject", async () => {
expect({id: 1, nome: 'Ana'}).toMatchObject({id: 1});
});

test("Exemplo: resolves", async () => {
await expect(Promise.resolve(5)).resolves.toBe(5);
});

test("Exemplo: rejects", async () => {
await expect(Promise.reject(new Error('Falhou'))).rejects.toThrow('Falhou');
});

test("Exemplo: toHaveBeenCalledTimes", async () => {
const enviar = jest.fn(); enviar(); expect(enviar).toHaveBeenCalledTimes(1);
});

test("Exemplo: toHaveBeenCalledWith", async () => {
const enviar = jest.fn(); enviar('ok'); expect(enviar).toHaveBeenCalledWith('ok');
});