import { Item, GildedRose, ItemName } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should degrade in quality as day passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([new Item("foo", 0, startingQuality)]);
    expect(gildedRose.items[0].quality).toBe(startingQuality);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(startingQuality - 1);
  });

  it("should degrade in quality twice as fast as sellBy date passes", () => {
    const startingQuality = 10;
    const qualityLossPerDay = 1;
    const sellBy = 1;
    const gildedRose = new GildedRose([
      new Item("foo", sellBy, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality - qualityLossPerDay);
    gildedRose.updateQuality();
    expect(item.quality).toBe(
      startingQuality - (qualityLossPerDay + qualityLossPerDay * 2)
    );
  });

  it("should never have negative quality", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([new Item("foo", 0, startingQuality)]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(0);
    gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  it("should increase in quality if name is Aged Brie", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.AgedBrie, 10, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 1);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 2);
  });

  it("should increase in quality at twice the speed if sellBy has passed and name is Aged Brie", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.AgedBrie, 1, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 1);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 3);
  });

  it("should never have quality more than 50", () => {
    const startingQuality = 49;
    const gildedRose = new GildedRose([
      new Item(ItemName.AgedBrie, 1, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(50);
    gildedRose.updateQuality();
    expect(item.quality).toBe(50);
  });

  it("should never have quality more than 50 even if sellBy has passed", () => {
    const startingQuality = 49;
    const gildedRose = new GildedRose([
      new Item(ItemName.AgedBrie, 0, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(50);
    gildedRose.updateQuality();
    expect(item.quality).toBe(50);
  });

  it("should never degrade in quality if name is Sulfuras", () => {
    const startingQuality = 80;
    const gildedRose = new GildedRose([
      new Item(ItemName.Sulfuras, 10, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality);
  });

  it("Should increase in quality as day passes if name is Backstage passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 15, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 1);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 2);
  });

  it("Should increase in quality as day passes if name is Backstage passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 15, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 1);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 2);
  });

  it("Should increase in quality by 2 as day passes if sellBy is 10 or less and name is Backstage passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 10, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 2);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 4);
  });

  it("Should increase in quality by 3 as day passes if sellBy is 5 or less and name is Backstage passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 5, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 3);
    gildedRose.updateQuality();
    expect(item.quality).toBe(startingQuality + 6);
  });

  it("Should drop quality to 0 if sellBy has passed and name is Backstage passes", () => {
    const startingQuality = 1;
    const gildedRose = new GildedRose([
      new Item(ItemName.BackstagePasses, 0, startingQuality),
    ]);
    const item = gildedRose.items[0];
    expect(item.quality).toBe(startingQuality);
    gildedRose.updateQuality();
    expect(item.quality).toBe(0);
    gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });
});
